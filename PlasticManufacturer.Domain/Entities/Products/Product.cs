using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Products
{
    public class Product: Entity
    {
        public virtual string Code { get; set; }
        public virtual string Ratio { get; set; }
        public virtual bool Compound { get; set; }
        public virtual decimal Price { get; set; }
        public virtual Formula Formula { get; set; }
    }
}
