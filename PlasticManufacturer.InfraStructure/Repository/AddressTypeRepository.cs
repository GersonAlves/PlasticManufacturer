using PlasticManufacturer.Domain.Entities.Adresses;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class AddressTypeRepository : IRepository<AddressType>
    {
        public void Add(AddressType entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.AddressTypes.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(AddressType entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.AddressTypes.Remove(entity);
                context.SaveChanges();
            }
        }

        public void Dispose()
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Dispose();
            }
        }

        public IList<AddressType> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.AddressTypes.ToList() ;
            }
        }

        public AddressType GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.AddressTypes.Where(x => x.Id == id).FirstOrDefault() ;
            }
        }

        public void Update(AddressType entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.AddressTypes.Add(entity);
                context.SaveChanges();
            }
        }
    }
}
