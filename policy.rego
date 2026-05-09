package policy

# Rule: deny if Docker image tag is "latest"
docker_deny contains msg if {
  input.image.tag == "latest"
  msg := "Docker images must not use 'latest' tag"
}

# Rule: deny if Kubernetes container has no resource limits
k8s_deny contains msg if {
  container := input.spec.containers[_]
  not container.resources.limits
  msg := sprintf("Container %s must define resource limits", [container.name])
}