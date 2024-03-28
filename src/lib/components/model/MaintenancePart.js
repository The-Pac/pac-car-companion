export class MaintenancePart {
    /** @type {Number | null} id*/
    id
    /** @type {Number} kilometer*/
    kilometer
    /** @type {String | null} name*/
    name
    /** @type {Boolean | null} is_part_of_the_maintenance*/
    is_part_of_the_maintenance
    /** @type {String | null} reference*/
    reference
    /** @type {PartLocation | null} part_location*/
    part_location
    /** @type {String | null} oem_reference*/
    oem_reference
    /** @type {Boolean | null} made_by*/
    diy
    /** @type {String | null} made_by*/
    made_by
    /** @type {Number | null} next_maintenance*/
    next_maintenance


    constructor() {
        this.id = 0;
        this.kilometer = null;
        this.name = null;
        this.is_part_of_the_maintenance = false;
        this.reference = null;
        this.part_location = null;
        this.oem_reference = null;
        this.diy = false;
        this.made_by = null;
        this.next_maintenance = null;
    }

    is_valid() {
        return this.kilometer !== null &&
            this.name !== null &&
            this.reference !== null &&
            this.part_location !== null &&
            this.oem_reference !== null &&
            this.made_by !== null &&
            this.next_maintenance !== null
    }

}


/**
 * @readonly
 * @enum {String}
 */
const PartLocation = {
    EngineCompartment: 'EngineCompartment',
    ExteriorBodywork: 'ExteriorBodywork',
    Interior: 'Interior',
    Chassis: 'Chassis',
    Tires: 'Tires',
    ElectronicSystems: 'ElectronicSystems',
    TransmissionSystem: 'TransmissionSystem',
    SuspensionSystem: 'SuspensionSystem',
    BrakingSystem: 'BrakingSystem',
};
