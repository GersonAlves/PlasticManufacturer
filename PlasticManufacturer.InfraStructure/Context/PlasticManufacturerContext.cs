using PlasticManufacturer.Domain.Entities.Adresses;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.Domain.Entities.Employees;
using PlasticManufacturer.Domain.Entities.Produto;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.Domain.Entities.ShippingMethods;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Context
{
    public class PlasticManufacturerContext : DbContext
    {
        public PlasticManufacturerContext() : base("PlasticManufacturerContext")
        {
            Configuration.LazyLoadingEnabled = true;
            Configuration.ProxyCreationEnabled = true;
        }

        public DbSet<RawMaterial>RawMateials { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<OperationType> OperationTypes { get; set; }
        public DbSet<Category> Categories { get; set; }
        


        //Customer
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerAddress> CustomerAddresses { get; set; }
        public DbSet<CustomerContacted> CustomersContacted { get; set; }
        public DbSet<CustomerDefault> CustomerDefaults { get; set; }
        public DbSet<CustomerRating> CustomersRating { get; set; }
        public DbSet<CustomerShipViaAccount> CustomerShipViaAccounts { get; set; }
        public DbSet<CustomerStatus> CustomersStatus { get; set; }
        public DbSet<SecondLabel> SecondLabels { get; set; }

        //Employee
        public DbSet<Employee> Employees { get; set; }


        //Product
        public DbSet<Product> Products { get; set; }

        public DbSet<ShippingMethod> ShippingMethods { get; set; }
        
        public DbSet<Freight> Freights { get; set; }

        //State City
        public DbSet<AddressType> AddressTypes { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }




    }
}
