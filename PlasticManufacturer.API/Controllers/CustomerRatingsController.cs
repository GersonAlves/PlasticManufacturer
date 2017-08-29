using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class CustomerRatingsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/CustomerRatings
        public IQueryable<CustomerRating> GetCustomersRating()
        {
            return db.CustomersRating;
        }

        // GET: api/CustomerRatings/5
        [ResponseType(typeof(CustomerRating))]
        public IHttpActionResult GetCustomerRating(int id)
        {
            CustomerRating customerRating = db.CustomersRating.Find(id);
            if (customerRating == null)
            {
                return NotFound();
            }

            return Ok(customerRating);
        }

        // PUT: api/CustomerRatings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomerRating(int id, CustomerRating customerRating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerRating.Id)
            {
                return BadRequest();
            }

            db.Entry(customerRating).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerRatingExists(id))
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

        // POST: api/CustomerRatings
        [ResponseType(typeof(CustomerRating))]
        public IHttpActionResult PostCustomerRating(CustomerRating customerRating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomersRating.Add(customerRating);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customerRating.Id }, customerRating);
        }

        // DELETE: api/CustomerRatings/5
        [ResponseType(typeof(CustomerRating))]
        public IHttpActionResult DeleteCustomerRating(int id)
        {
            CustomerRating customerRating = db.CustomersRating.Find(id);
            if (customerRating == null)
            {
                return NotFound();
            }

            db.CustomersRating.Remove(customerRating);
            db.SaveChanges();

            return Ok(customerRating);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerRatingExists(int id)
        {
            return db.CustomersRating.Count(e => e.Id == id) > 0;
        }
    }
}