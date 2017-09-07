using PlasticManufacturer.Domain.Entities.Customers;

namespace PlasticManufacturer.Domain.Entities.Color_Match_Request
{
    public class ColorCustomerAddress : Entity
    {
        public virtual CustomerAddress CustomerAddress { get; set; }
    }
}