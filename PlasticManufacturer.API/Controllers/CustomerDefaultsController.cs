using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class CustomerDefaultsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/CustomerDefaults
        public IQueryable<CustomerDefault> GetCustomerDefaults()
        {
            return db.CustomerDefaults;
        }

        // GET: api/CustomerDefaults/5
        [ResponseType(typeof(CustomerDefault))]
        public async Task<IHttpActionResult> GetCustomerDefault(int id)
        {
            CustomerDefault customerDefault = await db.CustomerDefaults.FindAsync(id);
            if (customerDefault == null)
            {
                return NotFound();
            }

            return Ok(customerDefault);
        }

        // PUT: api/CustomerDefaults/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCustomerDefault(int id, CustomerDefault customerDefault)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerDefault.Id)
            {
                return BadRequest();
            }

            db.Entry(customerDefault).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerDefaultExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CustomerDefaults
        [ResponseType(typeof(CustomerDefault))]
        public async Task<IHttpActionResult> PostCustomerDefault(CustomerDefault customerDefault)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomerDefaults.Add(customerDefault);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = customerDefault.Id }, customerDefault);
        }

        // DELETE: api/CustomerDefaults/5
        [ResponseType(typeof(CustomerDefault))]
        public async Task<IHttpActionResult> DeleteCustomerDefault(int id)
        {
            CustomerDefault customerDefault = await db.CustomerDefaults.FindAsync(id);
            if (customerDefault == null)
            {
                return NotFound();
            }

            db.CustomerDefaults.Remove(customerDefault);
            await db.SaveChangesAsync();

            return Ok(customerDefault);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerDefaultExists(int id)
        {
            return db.CustomerDefaults.Count(e => e.Id == id) > 0;
        }
    }
}