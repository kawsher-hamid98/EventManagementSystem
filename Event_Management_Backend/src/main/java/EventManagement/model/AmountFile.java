package EventManagement.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "MoneyExchange")
public class AmountFile {
    private String id;
    private String fileName;
    private int totalAmount;

    public AmountFile(String fileName, int totalAmount) {
        this.fileName = fileName;
        this.totalAmount = totalAmount;
    }
}
