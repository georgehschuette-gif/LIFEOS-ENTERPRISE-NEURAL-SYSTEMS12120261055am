"""
ML Models for Autonomous Recovery System
"""

import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import joblib
from typing import Tuple, Dict, Any
from pathlib import Path


class AnomalyDetectionModel: 
    """Neural network for detecting system anomalies"""

    def __init__(self, model_path: str = "models/anomaly_detection. h5"):
        self.model = None
        self.scaler = None
        self.model_path = model_path

    def build_model(self) -> keras.Model:
        """Build anomaly detection model"""
        model = keras.Sequential([
            layers.Input(shape=(10,)),
            layers.Dense(64, activation="relu"),
            layers.BatchNormalization(),
            layers.  Dropout(0.2),
            layers.Dense(32, activation="relu"),
            layers.BatchNormalization(),
            layers. Dropout(0.2),
            layers.Dense(16, activation="relu"),
            layers.Dense(5, activation="softmax"),
        ])

        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss="categorical_crossentropy",
            metrics=["accuracy"],
        )

        self.model = model
        return model

    def train(self, X_train: np.ndarray, y_train: np.ndarray,
              X_val: np.ndarray, y_val: np.ndarray,
              epochs: int = 50) -> Dict[str, Any]:
        """Train the model"""
        if self.model is None:
            self.build_model()

        from sklearn.preprocessing import StandardScaler
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self.scaler.transform(X_val)

        early_stopping = keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=10,
            restore_best_weights=True
        )

        history = self. model.fit(
            X_train_scaled, y_train,
            validation_data=(X_val_scaled, y_val),
            epochs=epochs,
            batch_size=32,
            callbacks=[early_stopping],
            verbose=1
        )

        return history. history

    def save(self, path: str = None) -> None:
        """Save model and scaler"""
        path = path or self.model_path
        if self.model is not None:
            self.model.save(path)
        if self.scaler is not None:
            joblib.dump(self.scaler, path. replace(". h5", "_scaler.pkl"))

    def load(self, path: str = None) -> None:
        """Load model and scaler"""
        path = path or self.model_path
        self.model = keras.models.load_model(path)
        self.scaler = joblib.load(path.replace(".h5", "_scaler.pkl"))


class RecoveryPlanningModel:
    """Neural network for recovery action planning"""

    def __init__(self, model_path: str = "models/recovery_planning.h5"):
        self.model = None
        self.scaler = None
        self.model_path = model_path
        self.recovery_types = ['restart', 'scale', 'rollback', 'replace', 'isolate', 'optimize']

    def build_model(self) -> keras.Model:
        """Build recovery planning model"""
        model = keras.Sequential([
            layers.Input(shape=(7,)),
            layers.Dense(32, activation="relu"),
            layers.BatchNormalization(),
            layers.Dropout(0.2),
            layers.Dense(16, activation="relu"),
            layers. Dropout(0.2),
            layers.Dense(8, activation="relu"),
            layers.Dense(6, activation="softmax"),
        ])

        model.compile(
            optimizer=keras.optimizers. Adam(learning_rate=0.001),
            loss="categorical_crossentropy",
            metrics=["accuracy"],
        )

        self.model = model
        return model

    def train(self, X_train: np.ndarray, y_train: np.ndarray,
              X_val:  np.ndarray, y_val: np.ndarray,
              epochs: int = 50) -> Dict[str, Any]:
        """Train recovery planning model"""
        if self. model is None:
            self. build_model()

        from sklearn.preprocessing import StandardScaler
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self. scaler.transform(X_val)

        early_stopping = keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=10,
            restore_best_weights=True
        )

        history = self.model.fit(
            X_train_scaled, y_train,
            validation_data=(X_val_scaled, y_val),
            epochs=epochs,
            batch_size=32,
            callbacks=[early_stopping],
            verbose=1
        )

        return history.history

    def save(self, path: str = None) -> None:
        """Save model"""
        path = path or self. model_path
        if self. model is not None:
            self.model.save(path)

    def load(self, path:  str = None) -> None:
        """Load model"""
        path = path or self.model_path
        self.model = keras. models.load_model(path)