use log::{error, info};
use sqlx::pool::PoolConnection;
use sqlx::query_as;
use tauri::{command, State};

use crate::Connection;
use crate::models::maintenance_part::{MaintenancePartDb};

#[command]
pub async fn get_maintenance_parts(pool_connection: State<'_, Connection>) -> Result<Vec<MaintenancePartDb>, ()> {
    match query_as::<_, MaintenancePartDb>("SELECT * FROM public.maintenance_part")
        .fetch_all(&pool_connection.0)
        .await {
        Ok(maintenance_part_dbs) => {
            Ok(maintenance_part_dbs)
        }
        Err(error) => {
            error!("{}",error);
            Err(())
        }
    }
}

#[command]
pub async fn add_maintenance_part(new_maintenance_part: MaintenancePartDb, pool_connection: State<'_, Connection>) -> Result<(), ()> {
    match query_as::<_, MaintenancePartDb>(
        "INSERT INTO public.maintenance_part (kilometer,name,is_part_of_the_maintenance,reference,oem_reference,diy,made_by,next_maintenance) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *")
        .bind(new_maintenance_part.kilometer)
        .bind(new_maintenance_part.name)
        .bind(new_maintenance_part.is_part_of_the_maintenance)
        .bind(new_maintenance_part.reference)
        .bind(new_maintenance_part.oem_reference)
        .bind(new_maintenance_part.diy)
        .bind(new_maintenance_part.made_by)
        .bind(new_maintenance_part.next_maintenance)
        .fetch_one(&pool_connection.0)
        .await
    {
        Ok(_) => {
            Ok(())
        }
        Err(error) => {
            error!("{}",error);
            Err(())
        }
    }
}

/*pub async fn get_maintenance_part_from_id(maintenance_part_id: i32, database_pool: State<DbConnection>) -> Result<MaintenancePartDb, ()> {
    match query_as::<_, MaintenancePartDb>("SELECT * FROM public.maintenance_part WHERE id = $1")
        .bind(maintenance_part_id)
        .fetch_optional(&database_pool.database_pool)
        .await {
        Ok(maintenance_part) => {
            match maintenance_part {
                Some(maintenance_part) => {
                    Ok(maintenance_part)
                }
                None => {
                    error!("No maintenance part found");
                    Err(())
                }
            }
        }
        Err(error) => {
            error!("{}",error);
            Err(())
        }
    }
}
*/

