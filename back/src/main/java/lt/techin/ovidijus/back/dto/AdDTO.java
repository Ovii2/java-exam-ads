package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class AdDTO {

    private Long id;
    private Long categoryId;
    private String title;
    private String description;
    private Integer price;
    private String city;
}
