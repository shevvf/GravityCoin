﻿// Преобразование getAllKeys в функцию, возвращающую Promise
function getAllKeys() {
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
    const promises = keys.map(key => getValue(key));
    return Promise.all(promises)
        .then(values => {
            const result = {};
            keys.forEach((key, index) => {
                result[key] = values[index];
            });
            return result;
        });
}

// Функция для получения значения из хранилища
function getValue(key) {
    return new Promise((resolve, reject) => {
        window.Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
            if (error) {
                reject('Error getting the value: ' + error);
            } else {
                try {
                    resolve(JSON.parse(value)); // Парсим значение как JSON
                } catch (e) {
                    resolve(value); // Если это не JSON, возвращаем как есть
                }
            }
        });
    });
}

// Функция для загрузки прогресса с использованием Promises
function loadProgress() {
    return getAllKeys()
        .then(keys => {
            console.log('Retrieved keys:', keys); // Дополнительная отладочная информация
            if (keys && keys.length > 0) {
                return getValues(keys);
            } else {
                console.log('No keys found in storage');
                return null;
            }
        })
        .then(values => {
            if (values) {
                console.log('Retrieved keys and values:', values); // Дополнительная отладочная информация
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
function saveProgress(key, value) {
    setValue(key, value);
}

// Функция для установки значения в хранилище
function setValue(key, value) {
    const params = {
        key: key,
        value: value
    };
    
    window.Telegram.WebApp.CloudStorage.saveStorageValue(params, function(error, success) {
        if (error) {
            console.error('Error storing the value:', error);
        } else if (success) {
            console.log('Value successfully stored');
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