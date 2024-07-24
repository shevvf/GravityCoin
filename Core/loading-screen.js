// window.addEventListener("load", function () {
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
    dataUrl: buildUrl + "/a9c5219e0f77cd4e567697afab0b7b6d.data.unityweb",
    frameworkUrl: buildUrl + "/ab6662029231c98aa2c48fd35afe971d.framework.js.unityweb",
    codeUrl: buildUrl + "/45b3935ac187b45b6cfec9c3c790880e.wasm.unityweb",
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
