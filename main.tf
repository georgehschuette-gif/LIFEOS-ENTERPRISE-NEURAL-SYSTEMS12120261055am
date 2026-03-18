terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

resource "aws_s3_bucket" "my_cool_bucket" {
  bucket = "my-unique-infra-bucket-2026" # Must be globally unique
}
