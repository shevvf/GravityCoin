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

function loadProgress() {
    return getAllKeys()
        .then(keys => {
            console.log('Retrieved keys:', keys);
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

function saveProgress(key, jsonValue){
    var value = JSON.parse(jsonValue);
    setValue(key, value);
}

function setValue(key, value) {
    window.Telegram.WebApp.CloudStorage.setItem(key, value, function(error, success) {
        if (error) {
            console.error('Error storing the value:', error);
        } else if (success) {
            console.log('Value successfully stored');
        }
    });
}

function getValue(key) {
    window.Telegram.WebApp.CloudStorage.getItem(key, function(error, value) {
        if (error) {
            console.error('Error getting the value:', error);
        } else {
            console.log('Retrieved value:', value);
        }
    });
}

function removeValue(key) {
    window.Telegram.WebApp.CloudStorage.removeItem(key, function(error, success) {
        if (error) {
            console.error('Error removing the value:', error);
        } else if (success) {
            console.log('Value successfully removed');
        }
    });
}

function removeValues(keys) {
    window.Telegram.WebApp.CloudStorage.removeItems(keys, function(error, success) {
        if (error) {
            console.error('Error removing the values:', error);
        } else if (success) {
            console.log('Values successfully removed');
        }
    });
}