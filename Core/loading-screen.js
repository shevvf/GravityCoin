﻿// window.addEventListener("load", function () {
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.register("ServiceWorker.js");
//     }
//   });
  var unityInstanceRef;
  var unsubscribe;
  var userDataJson;
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingRoot = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/9853637125e801e9aae48e78dbbdcfca.loader.js";
  var config = {
    dataUrl: buildUrl + "/54ab649d657f4f0b9d08640f9031a80b.data.unityweb",
    frameworkUrl: buildUrl + "/307a174c5a2e6251b50dedff1f40717f.framework.js.unityweb",
    codeUrl: buildUrl + "/bccbef19a0b33d7d8bd16792359ef522.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "AIVIKTestTask",
    productVersion: "0.1",
  };

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
  }

  function focusOnGame() {
      container.focus();
      window.focus();
      canvas.focus();
  }

  function updateProgress(progress) {
      var int_progress = Math.ceil(progress / 0.9);
      int_progress = int_progress > 100 ?
          100 : int_progress < 0 ? 0 : int_progress;
      progressBar.style.width = `${int_progress}%`;
      progressText.textContent = `${int_progress}%`;
  }

  let loadingDone = false;

  function hideLoadingScreen() {
      if (loadingDone) return;
      document.getElementById("loading-screen").style.opacity = 0.0;
      setTimeout(() => {
          loadingRoot.style.display = "none";
          loadingRoot.remove();
          console.log("Loading screen is done and deleted.");
      }, 500);
      loadingDone = true;
  }

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
          updateProgress(100 * progress);
      }).then((unityInstance) => {
          unityInstanceRef = unityInstance;
          hideLoadingScreen();
          focusOnGame();
          unityInstanceRef.SendMessage('Backend/Progress', 'SetWebAppUser', userDataJson);
      }).catch((message) => {
          alert(message);
      });
};

document.body.appendChild(script);
document.addEventListener("pointerdown", focusOnGame);
