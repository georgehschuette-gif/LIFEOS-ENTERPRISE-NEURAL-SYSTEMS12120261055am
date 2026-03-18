variable "project_name" {
  description = "Project/name prefix used for infra resources."
  type        = string
  default     = "lifeos-enterprise-neural-systems"
}

variable "region" {
  description = "Cloud region (provider-specific)."
  type        = string
  default     = "us-west-2"
}

variable "tags" {
  description = "Common tags/labels applied to resources (provider-specific)."
  type        = map(string)
  default     = {}
}
