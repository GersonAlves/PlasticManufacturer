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
using PlasticManufacturer.Domain.Entities.Employees;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class MaritalStatusController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/MaritalStatus
        public IQueryable<MaritalStatus> GetMaritalStatus()
        {
            return db.MaritalStatus;
        }

        // GET: api/MaritalStatus/5
        [ResponseType(typeof(MaritalStatus))]
        public async Task<IHttpActionResult> GetMaritalStatus(int id)
        {
            MaritalStatus maritalStatus = await db.MaritalStatus.FindAsync(id);
            if (maritalStatus == null)
            {
                return NotFound();
            }

            return Ok(maritalStatus);
        }

        // PUT: api/MaritalStatus/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMaritalStatus(int id, MaritalStatus maritalStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != maritalStatus.Id)
            {
                return BadRequest();
            }

            db.Entry(maritalStatus).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaritalStatusExists(id))
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

        // POST: api/MaritalStatus
        [ResponseType(typeof(MaritalStatus))]
        public async Task<IHttpActionResult> PostMaritalStatus(MaritalStatus maritalStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MaritalStatus.Add(maritalStatus);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = maritalStatus.Id }, maritalStatus);
        }

        // DELETE: api/MaritalStatus/5
        [ResponseType(typeof(MaritalStatus))]
        public async Task<IHttpActionResult> DeleteMaritalStatus(int id)
        {
            MaritalStatus maritalStatus = await db.MaritalStatus.FindAsync(id);
            if (maritalStatus == null)
            {
                return NotFound();
            }

            db.MaritalStatus.Remove(maritalStatus);
            await db.SaveChangesAsync();

            return Ok(maritalStatus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MaritalStatusExists(int id)
        {
            return db.MaritalStatus.Count(e => e.Id == id) > 0;
        }
    }
}