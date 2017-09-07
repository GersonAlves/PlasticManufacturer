using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Products
{
    public class Product: Entity
    {
        public virtual Formula Formula { get; set; }
    }
}
