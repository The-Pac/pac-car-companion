// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use std::default::Default;
use std::sync::Mutex;

use lazy_static::lazy_static;
use log::{info, LevelFilter};
use simple_logger::SimpleLogger;
use sqlx::{Pool, Postgres};
use tauri::State;

use libs::command::{create_external_page, event_to_three};

use crate::configs::database::database::connect_or_fail_to_the_database;
use crate::services::maintenance_part_services::{add_maintenance_part, get_maintenance_parts};

mod libs;
mod configs;
mod models;
mod services;

struct Connection(Pool<Postgres>);


#[tokio::main]
async fn main() {
    SimpleLogger::new().with_level(LevelFilter::Info).with_colors(true).init().unwrap();
    dotenv::dotenv().ok();
    let database_pool: Pool<Postgres> = connect_to_the_database().await.unwrap();

    info!("-Starting Tauri App-");
    tauri::Builder::default()
        .manage(Connection(database_pool))
        .invoke_handler(tauri::generate_handler![
            event_to_three,
            get_maintenance_parts,
            add_maintenance_part,
            create_external_page,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


async fn connect_to_the_database() -> Result<Pool<Postgres>, ()> {
    match connect_or_fail_to_the_database().await {
        Ok(pool) => {
            sqlx::migrate!("./src/migrations").run(&pool.clone()).await.unwrap();
            Ok(pool.clone())
        }
        Err(_) => {
            panic!("Cannot connect to the database");
        }
    }
}
