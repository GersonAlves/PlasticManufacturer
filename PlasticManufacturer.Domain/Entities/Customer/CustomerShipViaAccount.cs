using PlasticManufacturer.Domain.Entities.ShippingMethods;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerShipViaAccount : Entity
    {
        public ShippingMethod ShippingMethod { get; set; }
    }
}