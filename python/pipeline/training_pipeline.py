"""
Training pipeline for ML models
"""

import numpy as np
from sklearn.model_selection import train_test_split
from ml_models import AnomalyDetectionModel, RecoveryPlanningModel
from data_generator import DataGenerator
from pathlib import Path


class TrainingPipeline: 
    """Training pipeline for all ML models"""

    def __init__(self, models_dir: str = "models"):
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(exist_ok=True)
        self.results = {}

    def train_anomaly_detection(self, n_samples: int = 5000) -> dict:
        """Train anomaly detection model"""
        print("\n" + "="*50)
        print("Training Anomaly Detection Model")
        print("="*50)

        X, y = DataGenerator.generate_anomaly_data(n_samples)
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        model = AnomalyDetectionModel(str(self.models_dir / "anomaly_detection.h5"))
        model.build_model()

        print(f"Training model on {len(X_train)} samples...")
        history = model.train(X_train, y_train, X_val, y_val)
        model.save()

        print("✅ Anomaly Detection Model trained successfully")
        return {"model": "anomaly_detection", "status": "completed"}

    def train_recovery_planning(self, n_samples:  int = 5000) -> dict:
        """Train recovery planning model"""
        print("\n" + "="*50)
        print("Training Recovery Planning Model")
        print("="*50)

        X, y = DataGenerator.generate_recovery_data(n_samples)
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        model = RecoveryPlanningModel(str(self.models_dir / "recovery_planning. h5"))
        model.build_model()

        print(f"Training model on {len(X_train)} samples...")
        history = model.train(X_train, y_train, X_val, y_val)
        model.save()

        print("✅ Recovery Planning Model trained successfully")
        return {"model": "recovery_planning", "status": "completed"}

    def train_all(self, n_samples: int = 5000) -> dict:
        """Train all models"""
        print("\n" + "="*70)
        print("LIFEOS - ML MODEL TRAINING PIPELINE")
        print("="*70)

        self.train_anomaly_detection(n_samples)
        self.train_recovery_planning(n_samples)

        print("\n" + "="*70)
        print("TRAINING COMPLETE - ALL MODELS TRAINED SUCCESSFULLY")
        print("="*70 + "\n")

        return {"status": "completed", "models": ["anomaly_detection", "recovery_planning"]}


if __name__ == "__main__": 
    pipeline = TrainingPipeline()
    pipeline.train_all(n_samples=5000)