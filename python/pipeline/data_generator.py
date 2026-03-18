"""
Data generator for synthetic training data
"""

import numpy as np
from typing import Tuple


class DataGenerator:
    """Generates synthetic training data"""

    @staticmethod
    def generate_anomaly_data(n_samples: int = 5000) -> Tuple[np.ndarray, np.ndarray]:
        """Generate anomaly detection training data"""
        X = np.random.randn(n_samples, 10)
        y = np.zeros((n_samples, 5))

        for i in range(n_samples):
            if X[i, 0] > 1. 5:
                y[i, 0] = 1.0
            elif X[i, 9] < -1.5:
                y[i, 1] = 1.0
            elif X[i, 2] > 1.5:
                y[i, 2] = 1.0
            elif np.std(X[i, :3]) > 2.0:
                y[i, 3] = 1.0
            elif X[i, 4] > 1.5 and X[i, 5] > 1.0:
                y[i, 4] = 1.0
            else:
                y[i, : ] = np.array([0.2, 0.2, 0.2, 0.2, 0.2])

        y = y / y.sum(axis=1, keepdims=True)
        return X, y

    @staticmethod
    def generate_recovery_data(n_samples: int = 5000) -> Tuple[np.ndarray, np.ndarray]:
        """Generate recovery planning training data"""
        X = np. zeros((n_samples, 7))
        y = np.zeros((n_samples, 6))

        for i in range(n_samples):
            severity = np.random.uniform(0, 1)
            impact = np.random.uniform(0, 1)
            confidence = np.random.uniform(0. 5, 1.0)
            failure_prob = np.random.uniform(0, 1)
            health = np.random.uniform(0, 1)
            error_rate = np.random.uniform(0, 0.5)
            latency = np.random.uniform(0, 2)

            X[i] = [severity, impact, confidence, failure_prob, health, error_rate, latency]

            if severity > 0.8:
                if error_rate > 0.3:
                    y[i, 0] = 1.0
                elif impact > 0.7:
                    y[i, 1] = 1.0
            elif latency > 1.5:
                y[i, 4] = 1.0
            elif failure_prob > 0.7:
                y[i, 2] = 1.0
            else:
                y[i, 5] = 1.0

            if np.random.random() > 0.9:
                y[i] = np.zeros(6)
                y[i, np.random.randint(0, 6)] = 1.0

        return X, y