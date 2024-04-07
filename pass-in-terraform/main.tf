resource "digitalocean_database_cluster" "db-nlw-unite" {
  name       = "nlw-unite"
  engine     = "pg"
  version    = "16"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1
}

resource "digitalocean_database_db" "db-nlw-unite" {
  cluster_id = digitalocean_database_cluster.db-nlw-unite.id
  name       = "nlw-unite"

  depends_on = [
    digitalocean_database_cluster.db-nlw-unite
  ]
}
