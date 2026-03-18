"""
Training script - Run from project root
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path. insert(0, str(Path(__file__).parent.parent))

from pipeline.training_pipeline import TrainingPipeline

if __name__ == "__main__": 
    pipeline = TrainingPipeline(models_dir="models")
    results = pipeline.train_all(n_samples=5000)
    print(f"\nTraining Results: {results}")