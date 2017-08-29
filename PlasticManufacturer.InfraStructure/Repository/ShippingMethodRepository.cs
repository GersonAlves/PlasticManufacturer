using PlasticManufacturer.Domain.Entities.ShippingMethods;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class ShippingMethodRepository : IRepository<ShippingMethod>
    {
        public void Add(ShippingMethod entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.ShippingMethods.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(ShippingMethod entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.ShippingMethods.Remove(entity);
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

        public IList<ShippingMethod> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.ShippingMethods.ToList();
            }
        }

        public ShippingMethod GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.ShippingMethods.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void Update(ShippingMethod entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.ShippingMethods.Add(entity);
                context.SaveChanges();
            }
        }
    }
}
