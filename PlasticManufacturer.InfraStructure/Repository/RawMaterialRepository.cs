    using PlasticManufacturer.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class RawMaterialRepository : IRepository<RawMaterial>
    {
        public void Add(RawMaterial entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.RawMateials.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(RawMaterial entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.RawMateials.Remove(entity);
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

        public IList<RawMaterial> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.RawMateials.Include("Costs").ToList();
            }

        }

        public RawMaterial GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.RawMateials.Include("Costs").FirstOrDefault(x=> x.Id == id);
            }
        }

        public void Update(RawMaterial entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.RawMateials.Add(entity);
                context.SaveChanges();
            }
        }
    }
}
