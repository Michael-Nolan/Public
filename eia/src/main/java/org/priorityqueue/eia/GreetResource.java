package org.priorityqueue.eia;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import javax.naming.spi.DirStateFactory;

import org.priorityqueue.eia.model.EIAInputData;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mizosoft.methanol.HttpCache;
import com.github.mizosoft.methanol.Methanol;

import io.jstach.jstachio.JStachio;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import net.xyzsd.dichotomy.*;
import net.xyzsd.dichotomy.Result.Err;
import net.xyzsd.dichotomy.Result.OK;
import net.xyzsd.dichotomy.trying.Try;
import net.xyzsd.dichotomy.trying.Try.Failure;
import net.xyzsd.dichotomy.trying.Try.Success;
import net.xyzsd.dichotomy.trying.function.ExFunction;
import net.xyzsd.dichotomy.trying.function.ExSupplier;

@Path("/eia")
@ApplicationScoped
public class GreetResource {

    long maxSizeInBytes = 100 * 1024 * 1024; // 100 MBs
    HttpCache cache = HttpCache.newBuilder().cacheOnMemory(maxSizeInBytes)
            .build();

    HttpClient client = Methanol.newBuilder()
            .cache(cache)
            .build();

    String apiKey = System.getenv("EIA_API_KEY");
    

    
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.eia.gov/v2/electricity/electric-power-operational-data/data/?frequency=monthly&data[0]=generation&facets[fueltypeid][]=COW&facets[fueltypeid][]=HYC&facets[fueltypeid][]=NGO&facets[fueltypeid][]=NUC&facets[fueltypeid][]=TSN&facets[fueltypeid][]=WND&facets[location][]=US&facets[sectorid][]=99&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + apiKey))
            .GET()
            .build();

    Map<HttpRequest,HttpResponse<String>> cacheMap = new HashMap<>();
 

    @Produces(MediaType.TEXT_HTML)
    @GET
    public String getDefaultMessage() { 
            
            if (cacheMap.containsKey(request)){}

            return Try.wrap(() -> client.send(request, HttpResponse.BodyHandlers.ofString()))            
            .exec(httpResponse -> cacheMap.put(request, httpResponse))
            .map(httpResponse -> new ObjectMapper().readTree(httpResponse.body()).get("response").get("data"))
            // .map(e -> convertJsonToPojo(e))
            .map(e -> "")
            .orElseGet(() -> "failure");


            // List<EIAInputData> dataList = Arrays.asList(objectMapper.treeToValue(data, EIAInputData[].class));

            // List<StringWrapper> dates = new ArrayList<>();
            
            // Set<String> sources = new HashSet<>();

            // dataList
            //     .stream()
            //         .forEach( (a) -> sources.add(a.fuelTypeDescription()));
                    
            // List<EIADataSet> datadata = new ArrayList<>();
            // for (String fuelType : sources){
            //     var x = dataList 
            //     .stream()
            //             .filter((a) -> fuelType.equals(a.fuelTypeDescription()))
            //             .sorted((a, b) -> a.period().compareTo(b.period()))
            //             .toList();
                        
            //     dates = new ArrayList<>();

            //     StringBuilder values = new StringBuilder();
            //     for (EIAInputData m : x){
            //         dates.add(new StringWrapper(m.period()));
            //         values.append(m.generation()).append(",");
            //     }

            //     datadata.add(new EIADataSet(fuelType, values.toString()));
            // }

            // yield  JStachio.render(new EIAModel(dates, datadata));
            // }

            // case Err(Exception e) ->  e.getMessage();
            // };
    }
}



/* 
{
  "period" : "2024-06",
  "location" : "US",
  "stateDescription" : "U.S. Total",
  "sectorid" : "99",
  "sectorDescription" : "All Sectors",
  "fueltypeid" : "TSN",
  "fuelTypeDescription" : "estimated total solar",
  "generation" : "32535.87402",
  "generation-units" : "thousand megawatthours"
}
*/
