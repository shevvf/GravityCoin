﻿function loadProgres(){
    getAllKeys(function(keys) {
        if (keys && keys.length > 0) {
            getValues(keys, function(values) {
                console.log('Retrieved keys and values:', values);
            });
        } else {
            console.log('No keys found in storage');
        }
    });
}

function loadProgress(callback) {
    getAllKeys(function(keys) {
        if (keys && keys.length > 0) {
            getValues(keys, function(values) {
                console.log('Retrieved keys and values:', values);
                if (callback) {
                    callback(values);
                }
            });
        } else {
            console.log('No keys found in storage');
            if (callback) {
                callback(null);
            }
        }
    });
}

function saveProgress(key, value){
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

function getValues(keys) {
    window.Telegram.WebApp.CloudStorage.getItems(keys, function(error, values) {
        if (error) {
            console.error('Error getting the values:', error);
        } else {
            console.log('Retrieved values:', values);
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

function getAllKeys() {
    window.Telegram.WebApp.CloudStorage.getKeys(function(error, keys) {
        if (error) {
            console.error('Error getting the keys:', error);
        } else {
            console.log('Retrieved keys:', keys);
        }
    });
}
