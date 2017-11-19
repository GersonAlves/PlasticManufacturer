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
    public class CustomerResinsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/CustomerResins
        public IQueryable<CustomerResin> GetCustomerResins()
        {
            return db.CustomerResins;
        }

        // GET: api/CustomerResins/5
        [ResponseType(typeof(CustomerResin))]
        public async Task<IHttpActionResult> GetCustomerResin(int id)
        {
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            if (customerResin == null)
            {
                return NotFound();
            }

            return Ok(customerResin);
        }

        // PUT: api/CustomerResins/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCustomerResin(int id, CustomerResin customerResin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerResin.Id)
            {
                return BadRequest();
            }

            db.Entry(customerResin).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerResinExists(id))
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

        // POST: api/CustomerResins
        [ResponseType(typeof(CustomerResin))]
        public async Task<IHttpActionResult> PostCustomerResin(CustomerResin customerResin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomerResins.Add(customerResin);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = customerResin.Id }, customerResin);
        }

        // DELETE: api/CustomerResins/5
        [ResponseType(typeof(CustomerResin))]
        public async Task<IHttpActionResult> DeleteCustomerResin(int id)
        {
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            if (customerResin == null)
            {
                return NotFound();
            }

            db.CustomerResins.Remove(customerResin);
            await db.SaveChangesAsync();

            return Ok(customerResin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerResinExists(int id)
        {
            return db.CustomerResins.Count(e => e.Id == id) > 0;
        }
    }
}