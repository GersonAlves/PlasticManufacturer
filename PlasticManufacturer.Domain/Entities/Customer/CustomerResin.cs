using PlasticManufacturer.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerResin: Entity
    {
        public virtual string ResinType { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual int Quantidade { get; set; }
        public virtual UnitMeasurement UnitMeasurement { get; set; }
        public virtual string Code { get; set; }

    }
}
