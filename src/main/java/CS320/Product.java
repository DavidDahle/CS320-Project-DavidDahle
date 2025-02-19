package CS320;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;



@Entity
@Table(name = "products")
public class Product extends PanacheEntity {

    @Column(nullable = false)
    public String productName;

    @Column(nullable = false)
    public Double productPrice;

    public String productImage;

    // No-args constructor
    public Product() {
    }

    // All-args constructor
    public Product(String productName, Double productPrice, String productImage) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
    }

}