-- Add up migration script here
DROP TABLE IF EXISTS maintenance_part;
DROP TYPE IF EXISTS part_location;
CREATE TYPE part_location AS ENUM (
    'engineCompartment',
    'exteriorBodywork',
    'interior',
    'chassis',
    'tires',
    'electronicSystems',
    'transmissionSystem',
    'suspensionSystem',
    'brakingSystem'
    );
CREATE TABLE maintenance_part
(
    id                         SERIAL PRIMARY KEY,
    kilometer                  INT           NOT NULL,
    name                       VARCHAR(100)  NOT NULL,
    oem_reference              VARCHAR(50)   NOT NULL,
    reference                  VARCHAR(50)   NOT NULL,
    part_location              part_location NOT NULL,
    diy                        BOOLEAN       NOT NULL DEFAULT FALSE,
    made_by                    VARCHAR(50)   NULL,
    is_part_of_the_maintenance BOOLEAN       NOT NULL DEFAULT FALSE,
    next_maintenance           INT           NULL,
    created_date               TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);