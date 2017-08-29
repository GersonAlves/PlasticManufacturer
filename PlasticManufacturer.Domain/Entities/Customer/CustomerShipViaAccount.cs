using PlasticManufacturer.Domain.Entities.ShippingMethods;

namespace PlasticManufacturer.Domain.Entities.Common
{
    public class CustomerShipViaAccount : Entity
    {
        public ShippingMethod ShippingMethod { get; set; }
    }
}