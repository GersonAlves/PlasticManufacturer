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
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class FreightsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Freights
        public IQueryable<Freight> GetFreights()
        {
            return db.Freights;
        }

        // GET: api/Freights/5
        [ResponseType(typeof(Freight))]
        public async Task<IHttpActionResult> GetFreight(int id)
        {
            Freight freight = await db.Freights.FindAsync(id);
            if (freight == null)
            {
                return NotFound();
            }

            return Ok(freight);
        }

        // PUT: api/Freights/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFreight(int id, Freight freight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != freight.Id)
            {
                return BadRequest();
            }

            db.Entry(freight).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FreightExists(id))
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

        // POST: api/Freights
        [ResponseType(typeof(Freight))]
        public async Task<IHttpActionResult> PostFreight(Freight freight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Freights.Add(freight);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = freight.Id }, freight);
        }

        // DELETE: api/Freights/5
        [ResponseType(typeof(Freight))]
        public async Task<IHttpActionResult> DeleteFreight(int id)
        {
            Freight freight = await db.Freights.FindAsync(id);
            if (freight == null)
            {
                return NotFound();
            }

            db.Freights.Remove(freight);
            await db.SaveChangesAsync();

            return Ok(freight);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FreightExists(int id)
        {
            return db.Freights.Count(e => e.Id == id) > 0;
        }
    }
}