using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlasticManufacturer.API.Models.RawMaterial
{
    public class RawMaterialModels
    {

        public RawMaterialModels()
        {
            this.CostModel = new CostModels();
        }


        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime? CreationDate { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual string Code { get; set; }
        public virtual string Notes { get; set; }
        public virtual string ChemicalName { get; set; }
        public virtual Boolean Status { get; set; }
        public virtual string OperationType { get; set; }
        public virtual string Category { get; set; }
        public virtual string MainSupplier { get; set; }
        public virtual string MainCustomer { get; set; }
        public virtual string HeatStability { get; set; }
        public virtual string LightSatability { get; set; }
        public virtual CostModels CostModel { get; set; }
        public virtual Boolean Fda { get; set; }
        public virtual Boolean Hbfb { get; set; }
        public virtual Boolean QCRequired { get; set; }
        public virtual string BarCode { get; set; }
    }
}