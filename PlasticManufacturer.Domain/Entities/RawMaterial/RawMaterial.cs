using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.RawMaterial
{
    public class RawMaterial : Entity
    {
        public virtual string Code { get; set; }
        public virtual string Notes { get; set; }
        public virtual string ChemicalName { get; set; }
        public virtual Boolean? Status { get; set; }
        public virtual OperationType OperationType { get; set; }
        public virtual Category Category { get; set; }
        public virtual string MainSupplier { get; set; }
        public virtual string MainCustomer { get; set; }
        public virtual string HeatStability { get; set; }
        public virtual string LightSatability { get; set; }
        public virtual IList<Cost> Costs { get; set; }
        public virtual Boolean? Fda { get; set; }
        public virtual Boolean? Hbfb { get; set; }
        public virtual Boolean? QCRequired { get; set; }
        public virtual string BarCode { get; set; }

        public RawMaterial() {

            this.Costs = new List<Cost>();
        }
    }
}
