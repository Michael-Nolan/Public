package org.priorityqueue.eia;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public record EIAData(String period, 
    String location, 
    String stateDescription,
    String sectorid,
    String sectorDescription,
    String fueltypeid,
    String fuelTypeDescription,
    String generation,
    @JsonProperty("generation-units")
    String generationUnits) {
}