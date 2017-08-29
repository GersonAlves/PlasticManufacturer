using System;

namespace PlasticManufacturer.API.Models.RawMaterial
{
    public class CostModels
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime? CreationDate { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual decimal Value { get; set; }
    }
}