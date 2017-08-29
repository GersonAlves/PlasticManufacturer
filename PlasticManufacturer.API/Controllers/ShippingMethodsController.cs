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
using PlasticManufacturer.Domain.Entities.ShippingMethods;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class ShippingMethodsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/ShippingMethods
        public IQueryable<ShippingMethod> GetShippingMethods()
        {
            return db.ShippingMethods;
        }

        // GET: api/ShippingMethods/5
        [ResponseType(typeof(ShippingMethod))]
        public IHttpActionResult GetShippingMethod(int id)
        {
            ShippingMethod shippingMethod = db.ShippingMethods.Find(id);
            if (shippingMethod == null)
            {
                return NotFound();
            }

            return Ok(shippingMethod);
        }

        // PUT: api/ShippingMethods/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutShippingMethod(int id, ShippingMethod shippingMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shippingMethod.Id)
            {
                return BadRequest();
            }

            db.Entry(shippingMethod).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingMethodExists(id))
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

        // POST: api/ShippingMethods
        [ResponseType(typeof(ShippingMethod))]
        public IHttpActionResult PostShippingMethod(ShippingMethod shippingMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ShippingMethods.Add(shippingMethod);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = shippingMethod.Id }, shippingMethod);
        }

        // DELETE: api/ShippingMethods/5
        [ResponseType(typeof(ShippingMethod))]
        public IHttpActionResult DeleteShippingMethod(int id)
        {
            ShippingMethod shippingMethod = db.ShippingMethods.Find(id);
            if (shippingMethod == null)
            {
                return NotFound();
            }

            db.ShippingMethods.Remove(shippingMethod);
            db.SaveChanges();

            return Ok(shippingMethod);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ShippingMethodExists(int id)
        {
            return db.ShippingMethods.Count(e => e.Id == id) > 0;
        }
    }
}