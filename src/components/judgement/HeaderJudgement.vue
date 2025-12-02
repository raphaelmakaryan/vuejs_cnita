<script>
export default {
  name: "HeaderJugment"
}
</script>

<template>
  <header class="mb-5">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">
            <img src="" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            Jugment
          </a>
          <form class="d-flex w-25" role="search">
            <input class="form-control me-2 w-100" type="search" placeholder="Search"
                   aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
