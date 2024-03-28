use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Clone, Debug, PartialEq, PartialOrd, sqlx::Type, Deserialize, Serialize)]
#[sqlx(type_name = "part_location", rename_all = "camelCase")]
pub enum PartLocation {
    EngineCompartment,
    ExteriorBodywork,
    Interior,
    Chassis,
    Tires,
    ElectronicSystems,
    TransmissionSystem,
    SuspensionSystem,
    BrakingSystem,
}

#[derive(Serialize, Deserialize, FromRow, Clone, Debug)]
pub struct MaintenancePartDb {
    pub id: i32,
    pub kilometer: i32,
    pub name: String,
    pub reference: String,
    pub part_location: PartLocation,
    pub oem_reference: String,
    pub diy: bool,
    pub made_by: Option<String>,
    pub is_part_of_the_maintenance: bool,
    pub next_maintenance: Option<i32>,
}
