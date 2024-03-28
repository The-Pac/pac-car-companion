import {readable, writable} from 'svelte/store';

export const event_to_three = writable(String());

export const current_gear = writable(Number(0));

export const current_turn_signal = writable(Number(2));

export const current_speed = writable(Number(120));

export const current_oil_temp = writable(Number(155));
export const oil_temp_max = readable(Number(250));

export const current_fuel_level = writable(Number(20));
export const fuel_level_max = readable(Number(60));

export const current_oil_pressure = writable(Number(2));
export const oil_pressure_max = readable(Number(3));
export const current_coolant_temp = writable(Number(50));
export const coolant_temp_max = readable(Number(130));


export const current_rpm = writable(Number(0));
export const max_rpm = readable(Number(7000));
export const idle_rpm = readable(Number(800));
export const medium_rpm = readable(Number(5000));


