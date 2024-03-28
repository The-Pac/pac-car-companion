use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
    event_to_three: String,
}


#[tauri::command]
pub fn event_to_three(app_handle: tauri::AppHandle, event_to_three: String) -> Result<(), ()> {
    match app_handle.emit_all("event_to_three", Payload { event_to_three }) {
        Ok(_) => {
            Ok(())
        }
        Err(_) => {
            Err(())
        }
    }
}

#[tauri::command]
pub async fn create_external_page(app_handle: tauri::AppHandle, url: String, label: String) -> Result<(), ()> {
    let window = tauri::WindowBuilder::new(&app_handle, label, tauri::WindowUrl::External(url.parse().unwrap()))
        .build()
        .unwrap();
    window.center().expect("Failed to center the window");
    window.set_always_on_top(true).expect("Failed to set always on top");
    Ok(())
}
