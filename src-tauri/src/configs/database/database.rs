use std::str::FromStr;

use log::info;
use serde::{Deserialize, Serialize};
use sqlx::{ConnectOptions, Error, PgPool, Pool, Postgres};
use sqlx::postgres::PgConnectOptions;

#[derive(Deserialize, Serialize)]
pub struct DatabaseConfig {
    host: String,
    port: u16,
    username: String,
    password: String,
    database: String,
}

impl DatabaseConfig {
    pub fn host(&self) -> &str {
        &self.host
    }
    pub fn port(&self) -> u16 {
        self.port
    }
    pub fn username(&self) -> &str {
        &self.username
    }
    pub fn password(&self) -> &str {
        &self.password
    }
    pub fn database(&self) -> &str {
        &self.database
    }
}

pub async fn connect_or_fail_to_the_database() -> Result<Pool<Postgres>, Error> {
    let file_config = include_str!("./database_configuration.json");
    let database_config: DatabaseConfig = serde_json::from_str(file_config).unwrap();

    info!("-Connect to the database-");
    let options = PgConnectOptions::from_str(
        format!("postgresql://{}:{}@{}/{}",
                database_config.username,
                database_config.password,
                database_config.host,
                database_config.database
        ).as_str()).unwrap()
        .disable_statement_logging().clone();

    PgPool::connect_with(options).await
}