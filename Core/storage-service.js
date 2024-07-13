﻿function getAllKeys() {
    return new Promise((resolve, reject) => {
        window.Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
            if (error) {
                reject('Error getting the keys: ' + error);
            } else {
                resolve(keys);
            }
        });
    });
}

// Преобразование getValues в функцию, возвращающую Promise
function getValues(keys) {
    return new Promise((resolve, reject) => {
        window.Telegram.WebApp.CloudStorage.getItems(keys, (error, values) => {
            if (error) {
                reject('Error getting the values: ' + error);
            } else {
                resolve(values);
            }
        });
    });
}

// Функция для загрузки прогресса с использованием Promises
function loadProgress() {
    return getAllKeys()
        .then(keys => {
            if (keys && keys.length > 0) {
                return getValues(keys);
            } else {
                console.log('No keys found in storage');
                return null;
            }
        })
        .then(values => {
            if (values) {
                console.log('Retrieved keys and values:', values);
                return values;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error retrieving keys and values:', error);
            return null;
        });
}

// Функция для сохранения прогресса
function saveProgress(key, jsonValue){
    var value = JSON.parse(jsonValue);
    setValue(key, value);
}

// Функция для установки значения в хранилище
function setValue(key, value) {
    window.Telegram.WebApp.CloudStorage.setItem(key, value, function(error, success) {
        if (error) {
            console.error('Error storing the value:', error);
        } else if (success) {
            console.log('Value successfully stored');
        }
    });
}

// Функция для получения значения из хранилища
function getValue(key) {
    window.Telegram.WebApp.CloudStorage.getItem(key, function(error, value) {
        if (error) {
            console.error('Error getting the value:', error);
        } else {
            console.log('Retrieved value:', value);
        }
    });
}

// Функция для удаления значения из хранилища
function removeValue(key) {
    window.Telegram.WebApp.CloudStorage.removeItem(key, function(error, success) {
        if (error) {
            console.error('Error removing the value:', error);
        } else if (success) {
            console.log('Value successfully removed');
        }
    });
}

// Функция для удаления нескольких значений из хранилища
function removeValues(keys) {
    window.Telegram.WebApp.CloudStorage.removeItems(keys, function(error, success) {
        if (error) {
            console.error('Error removing the values:', error);
        } else if (success) {
            console.log('Values successfully removed');
        }
    });
}
