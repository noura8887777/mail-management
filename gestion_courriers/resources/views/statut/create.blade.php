@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Nouveau Statut</h3>
    </div>
    <div class="card-body">
        @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif

        <form action="{{ route('statut.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="nom_statut">Nom du Statut<span class="text-danger">*</span></label>
                <input type="text" name="nom_statut" id="nom_statut" class="form-control @error('nom_statut') is-invalid @enderror" value="{{ old('nom_statut') }}" required>
                @error('nom_statut')
                    <span class="invalid-feedback">{{ $message }}</span>
                @enderror
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <a href="{{ route('statut.index') }}" class="btn btn-secondary">Annuler</a>
            </div>
        </form>
    </div>
</div>
@endsection 