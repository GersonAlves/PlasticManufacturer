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
    public class TitlesController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Titles
        public IQueryable<Title> GetTitles()
        {
            return db.Titles;
        }

        // GET: api/Titles/5
        [ResponseType(typeof(Title))]
        public async Task<IHttpActionResult> GetTitle(int id)
        {
            Title title = await db.Titles.FindAsync(id);
            if (title == null)
            {
                return NotFound();
            }

            return Ok(title);
        }

        // PUT: api/Titles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTitle(int id, Title title)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != title.Id)
            {
                return BadRequest();
            }

            db.Entry(title).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TitleExists(id))
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

        // POST: api/Titles
        [ResponseType(typeof(Title))]
        public async Task<IHttpActionResult> PostTitle(Title title)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Titles.Add(title);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = title.Id }, title);
        }

        // DELETE: api/Titles/5
        [ResponseType(typeof(Title))]
        public async Task<IHttpActionResult> DeleteTitle(int id)
        {
            Title title = await db.Titles.FindAsync(id);
            if (title == null)
            {
                return NotFound();
            }

            db.Titles.Remove(title);
            await db.SaveChangesAsync();

            return Ok(title);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TitleExists(int id)
        {
            return db.Titles.Count(e => e.Id == id) > 0;
        }
    }
}