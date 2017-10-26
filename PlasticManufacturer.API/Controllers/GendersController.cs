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
    public class GendersController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Genders
        public IQueryable<Gender> GetGenders()
        {
            return db.Genders;
        }

        // GET: api/Genders/5
        [ResponseType(typeof(Gender))]
        public async Task<IHttpActionResult> GetGender(int id)
        {
            Gender gender = await db.Genders.FindAsync(id);
            if (gender == null)
            {
                return NotFound();
            }

            return Ok(gender);
        }

        // PUT: api/Genders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutGender(int id, Gender gender)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gender.Id)
            {
                return BadRequest();
            }

            db.Entry(gender).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenderExists(id))
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

        // POST: api/Genders
        [ResponseType(typeof(Gender))]
        public async Task<IHttpActionResult> PostGender(Gender gender)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Genders.Add(gender);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = gender.Id }, gender);
        }

        // DELETE: api/Genders/5
        [ResponseType(typeof(Gender))]
        public async Task<IHttpActionResult> DeleteGender(int id)
        {
            Gender gender = await db.Genders.FindAsync(id);
            if (gender == null)
            {
                return NotFound();
            }

            db.Genders.Remove(gender);
            await db.SaveChangesAsync();

            return Ok(gender);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GenderExists(int id)
        {
            return db.Genders.Count(e => e.Id == id) > 0;
        }
    }
}