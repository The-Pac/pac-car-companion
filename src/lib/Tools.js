import {Vector2, Vector3} from "three";

export function get_vector_position_from_deg(radius, angle) {
    let theta = angle * Math.PI / 180;
    return new Vector3(radius * Math.sin(theta), 0, -(radius * Math.cos(theta)))
}

export function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
}

export function get_random_hex() {
    return Math.floor(Math.random() * 16777215);
}

export function get_point_on_circle(radius, angle) {
    return new Vector2(radius * Math.sin(angle), radius * Math.cos(angle))
}
