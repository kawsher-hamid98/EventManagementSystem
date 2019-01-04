package EventManagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "FileModel")
public class FileModel {
    @Id
    private String id;
    private String name;
    private String mimeType;
    private byte[] file;

    public FileModel(String name, String mimeType, byte[] file) {
        this.name = name;
        this.mimeType = mimeType;
        this.file = file;
    }
}
