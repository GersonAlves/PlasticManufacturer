using PlasticManufacturer.Domain.Entities.Common;

namespace PlasticManufacturer.Domain.Entities.RawMaterial
{
    public class Cost : Entity
    {
        public virtual decimal Value { get; set; }
        public virtual Currency Currency { get; set; }
        public int RawMaterialId { get; set; }
    }
}