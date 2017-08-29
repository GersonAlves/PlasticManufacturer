using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Adresses
{
    public enum AddressTypeEnum : int
    {
        ShipTo = 1,
        BillTo = 2,
        Both = 3
    }

    public class AddressType: Entity
    {
    }
}
